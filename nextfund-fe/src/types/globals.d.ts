// CSS Modules
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Global CSS imports
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}