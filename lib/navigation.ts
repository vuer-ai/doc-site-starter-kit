export interface PageMeta {
  path: string
  title: string
  section: string
}

export const pages: PageMeta[] = [
  // Introduction
  { path: '/',                          title: 'Overview',            section: 'Introduction' },

  // Getting Started
  { path: '/getting-started',           title: 'Quick Start',         section: 'Getting Started' },
  { path: '/installation',              title: 'Installation',        section: 'Getting Started' },
  { path: '/configuration',             title: 'Configuration',       section: 'Getting Started' },

  // Hooks
  { path: '/hooks',                     title: 'Overview',            section: 'Hooks' },
  { path: '/hooks/use-page-context',    title: 'usePageContext',      section: 'Hooks' },
  { path: '/hooks/use-theme',           title: 'useTheme',           section: 'Hooks' },

  // Style Guide
  { path: '/style-guide/colors',        title: 'Colors',             section: 'Style Guide' },
  { path: '/style-guide/typography',    title: 'Typography',         section: 'Style Guide' },
  { path: '/style-guide/spacing',       title: 'Spacing & Layout',   section: 'Style Guide' },
  { path: '/style-guide/icons',         title: 'Icons',              section: 'Style Guide' },

  // Form Inputs
  { path: '/form-inputs',               title: 'Overview',            section: 'Form Inputs' },
  { path: '/form-inputs/text-input',    title: 'Text Input',         section: 'Form Inputs' },
  { path: '/form-inputs/search-input',  title: 'Search Input',       section: 'Form Inputs' },
  { path: '/form-inputs/select',        title: 'Select',             section: 'Form Inputs' },
  { path: '/form-inputs/checkbox-radio', title: 'Checkbox & Radio',  section: 'Form Inputs' },
  { path: '/form-inputs/error-message', title: 'Error Message',      section: 'Form Inputs' },

  // System
  { path: '/system',                    title: 'Overview',            section: 'System' },
  { path: '/system/core-concepts',      title: 'Core Concepts',      section: 'System' },
  { path: '/system/data-types',         title: 'Data Types',         section: 'System' },
  { path: '/system/rendering',          title: 'Rendering Pipeline', section: 'System' },
  { path: '/system/interaction',        title: 'Interaction Model',  section: 'System' },
  { path: '/system/api-reference',      title: 'API Reference',      section: 'System' },

  // Layouts
  { path: '/layouts',                   title: 'Overview',            section: 'Layouts' },
  { path: '/layouts/org-page',          title: 'Org Page',           section: 'Layouts' },
  { path: '/layouts/dock-panels',       title: 'Dock & Panels',      section: 'Layouts' },
  { path: '/layouts/panel-container',   title: 'Panel Container',    section: 'Layouts' },
  { path: '/layouts/toolbar',           title: 'Toolbar',            section: 'Layouts' },
  { path: '/layouts/resize-handles',    title: 'Resize Handles',     section: 'Layouts' },
  { path: '/layouts/dialog',            title: 'Dialog',             section: 'Layouts' },

  // Components
  { path: '/components',                title: 'Overview',            section: 'Components' },
  { path: '/components/button',         title: 'Button',             section: 'Components' },
  { path: '/components/badge',          title: 'Badge',              section: 'Components' },
  { path: '/components/avatar',         title: 'Avatar',             section: 'Components' },
  { path: '/components/card',           title: 'Card',               section: 'Components' },
  { path: '/components/project-card',   title: 'Project Card',       section: 'Components' },
  { path: '/components/tabs',           title: 'Tabs',               section: 'Components' },
  { path: '/components/breadcrumb',     title: 'Breadcrumb',         section: 'Components' },
  { path: '/components/list',           title: 'List',               section: 'Components' },
  { path: '/components/file-tree',      title: 'File Tree',          section: 'Components' },
  { path: '/components/waterfall',      title: 'Waterfall',          section: 'Components' },
  { path: '/components/line-chart',     title: 'Line Chart',         section: 'Components' },
  { path: '/components/editor',         title: 'Editor',             section: 'Components' },
  { path: '/components/callout',        title: 'Callout',            section: 'Components' },
  { path: '/components/code-block',     title: 'CodeBlock',          section: 'Components' },
  { path: '/components/steps',          title: 'Steps',              section: 'Components' },
  { path: '/components/client-only',    title: 'ClientOnly',         section: 'Components' },
]

export function getAdjacentPages(path: string) {
  const idx = pages.findIndex(p => p.path === path)
  return {
    current: pages[idx] ?? null,
    prev:    idx > 0              ? pages[idx - 1] : null,
    next:    idx < pages.length - 1 ? pages[idx + 1] : null,
  }
}
