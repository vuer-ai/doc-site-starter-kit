# Parallel agentic development with git worktrees + tmux/iTerm2
#
# Targets:
#   make fork          BRANCH=name [PROMPT="..."]   — new worktree + pane in current session
#   make fork-window   BRANCH=name [PROMPT="..."]   — new worktree + new tmux session (iTerm2 window)
#   make rename        NAME=new-name                 — rename current session
#   make list                                        — list all sessions, windows, worktrees
#   make clean         BRANCH=name                  — remove worktree, branch, session
#
# WORKTREE_BASE: where worktrees are created (default: ../worktrees relative to repo root)
# BASE_BRANCH:   branch to fork from              (default: main)

REPO_ROOT     := $(shell git rev-parse --show-toplevel)
WORKTREE_BASE ?= $(REPO_ROOT)/../worktrees
BASE_BRANCH   ?= main
BRANCH        ?=
PROMPT        ?=
NAME          ?=

# Detect if we're inside a tmux session
TMUX_ACTIVE := $(shell [ -n "$$TMUX" ] && echo yes || echo no)

.PHONY: fork fork-window rename list clean _require-branch _require-name

##
## fork — new worktree + split pane in the current tmux session
##
fork: _require-branch
	@echo "→ Creating worktree for branch '$(BRANCH)'..."
	@mkdir -p $(WORKTREE_BASE)
	@git worktree add $(WORKTREE_BASE)/$(BRANCH) -b $(BRANCH) $(BASE_BRANCH) 2>/dev/null \
		|| git worktree add $(WORKTREE_BASE)/$(BRANCH) $(BRANCH)
	@echo "  Worktree: $(WORKTREE_BASE)/$(BRANCH)"
	@if [ "$(TMUX_ACTIVE)" = "yes" ]; then \
		PANE=$$(tmux split-window -h -c "$(WORKTREE_BASE)/$(BRANCH)" -P -F '#{pane_id}'); \
		tmux select-layout even-horizontal; \
		if [ -n "$(PROMPT)" ]; then \
			tmux send-keys -t "$$PANE" "claude '$(PROMPT)'" Enter; \
		fi; \
		echo "  Pane opened (id: $$PANE)"; \
	else \
		echo "  Not inside tmux — open the worktree manually:"; \
		echo "  cd $(WORKTREE_BASE)/$(BRANCH)"; \
	fi

##
## fork-window — new worktree + new tmux session (becomes a native iTerm2 window via -CC)
##
fork-window: _require-branch
	@echo "→ Creating worktree for branch '$(BRANCH)'..."
	@mkdir -p $(WORKTREE_BASE)
	@git worktree add $(WORKTREE_BASE)/$(BRANCH) -b $(BRANCH) $(BASE_BRANCH) 2>/dev/null \
		|| git worktree add $(WORKTREE_BASE)/$(BRANCH) $(BRANCH)
	@echo "  Worktree: $(WORKTREE_BASE)/$(BRANCH)"
	@echo "→ Creating tmux session '$(BRANCH)'..."
	@tmux new-session -d -s "$(BRANCH)" -c "$(WORKTREE_BASE)/$(BRANCH)" 2>/dev/null \
		|| echo "  Session '$(BRANCH)' already exists, reusing"
	@if [ -n "$(PROMPT)" ]; then \
		tmux send-keys -t "$(BRANCH)" "claude '$(PROMPT)'" Enter; \
	fi
	@if [ "$(TMUX_ACTIVE)" = "yes" ]; then \
		tmux switch-client -t "$(BRANCH)"; \
	else \
		echo "  Attach with:  tmux -CC attach -t $(BRANCH)"; \
		echo "  Or regular:   tmux attach -t $(BRANCH)"; \
	fi
	@echo "  Session '$(BRANCH)' ready."

##
## rename — rename the current tmux session
##
rename: _require-name
	@if [ "$(TMUX_ACTIVE)" = "yes" ]; then \
		OLD=$$(tmux display-message -p '#S'); \
		tmux rename-session "$(NAME)"; \
		echo "→ Session '$$OLD' renamed to '$(NAME)'"; \
	else \
		echo "Not inside a tmux session."; exit 1; \
	fi

##
## list — all tmux sessions, windows, and git worktrees
##
list:
	@echo "━━━ tmux sessions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@tmux list-sessions 2>/dev/null || echo "  (no active sessions)"
	@echo ""
	@echo "━━━ tmux windows (all sessions) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@tmux list-windows -a 2>/dev/null || echo "  (none)"
	@echo ""
	@echo "━━━ git worktrees ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@git worktree list

##
## clean — remove worktree, local branch, and tmux session for BRANCH
##
clean: _require-branch
	@echo "→ Removing tmux session '$(BRANCH)' (if exists)..."
	@tmux kill-session -t "$(BRANCH)" 2>/dev/null && echo "  Session killed." || echo "  No session found."
	@echo "→ Removing worktree at $(WORKTREE_BASE)/$(BRANCH)..."
	@git worktree remove "$(WORKTREE_BASE)/$(BRANCH)" --force 2>/dev/null && echo "  Worktree removed." || echo "  No worktree found."
	@echo "→ Deleting branch '$(BRANCH)'..."
	@git branch -d "$(BRANCH)" 2>/dev/null || git branch -D "$(BRANCH)" 2>/dev/null && echo "  Branch deleted." || echo "  No branch found."

# ── guards ────────────────────────────────────────────────────────────────────

_require-branch:
	@if [ -z "$(BRANCH)" ]; then \
		echo "Error: BRANCH is required."; \
		echo "  Usage: make $(MAKECMDGOALS) BRANCH=my-feature [PROMPT=\"...\"]"; \
		exit 1; \
	fi

_require-name:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required."; \
		echo "  Usage: make rename NAME=new-name"; \
		exit 1; \
	fi
