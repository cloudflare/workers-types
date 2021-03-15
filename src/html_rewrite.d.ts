interface ContentOptions {
  /**
   * Controls the way the HTMLRewriter treats inserted content.
   *
   * - true: Raw HTML
   * - false: (Default) Text and any HTML will be escaped
   */
  html: boolean
}

interface Element {
  /**
   *  The namespace URI of the element according to Infra Spec
   * (https://infra.spec.whatwg.org/#namespaces).
   */
  namespaceURI: string
  /**
   * e.g. "div"
   */
  tagName: string
  /**
   * Read-Only - key/value pairs of attributes.
   */
  readonly attributes: IterableIterator<[string, string]>
  /**
   * Indicates whether the element was removed/replaced in a previous handler
   */
  removed: boolean

  /**
   * Returns the value for a given attribute name on the element, or null if it isn’t found.
   */
  getAttribute(name: string): string | null
  /**
   * Returns a boolean indicating whether an attribute exists on the element.
   */
  hasAttribute(name: string): boolean
  /**
   * Sets an attribute to a provided value, creating the attribute if it doesn’t exist.
   */
  setAttribute(name: string, value: string): Element
  /**
   * Removes the attribute.
   */
  removeAttribute(name: string): Element
  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element
  /**
   * Inserts content right after the element.
   */
  after(content: string, options?: ContentOptions): Element
  /**
   * Inserts content right after the start tag of the element.
   */
  prepend(content: string, options?: ContentOptions): Element
  /**
   * Inserts content right before the end tag of the element.
   */
  append(content: string, options?: ContentOptions): Element
  /**
   * Removes the element and inserts content in place of it.
   */
  replace(content: string, options?: ContentOptions): Element
  /**
   * Replaces content of the element.
   */
  setInnerContent(content: string, options?: ContentOptions): Element
  /**
   * Removes the element with all its content.
   */
  remove(): Element
  /**
   * Removes the start tag and end tag of the element, but keeps its inner content intact.
   */
  removeAndKeepContent(): Element
}

interface Text {
  /**
   * Indicates whether the element was removed/replaced in a previous handler.
   */
  removed: boolean
  /**
   * Read-Only - The text contents of the chunk. Could be empty if the chunk
   * is the last chunk of the text node.
   */
  readonly text: string
  /**
   * Read-Only - indicates whether the chunk is the last chunk of the text node.
   */
  readonly lastInTextNode: boolean

  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element
  /**
   * Inserts content right after the element.
   */
  after(content: string, options?: ContentOptions): Element
  /**
   * Removes the element and inserts content in place of it.
   */
  replace(content: string, options?: ContentOptions): Element
  /**
   * Removes the element with all its content.
   */
  remove(): Element
}

interface Comment {
  /**
   * Indicates whether the element was removed/replaced in a previous handler.
   */
  removed: boolean
  /**
   * This property can be assigned different values, to modify comment’s text.
   */
  text: string

  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element
  /**
   * Inserts content right after the element.
   */
  after(content: string, options?: ContentOptions): Element
  /**
   * Removes the element and inserts content in place of it.
   */
  replace(content: string, options?: ContentOptions): Element
  /**
   * Removes the element with all its content.
   */
  remove(): Element
}

interface Doctype {
  readonly name: string | null
  /**
   * Read-Only, The quoted string in the doctype after the PUBLIC atom.
   */
  readonly publicId: string | null
  /**
   * Read-Only, The quoted string in the doctype after the SYSTEM atom or immediately after the publicId.
   */
  readonly systemId: string | null
}

interface DocumentEnd {
  /**
   * Inserts content right after the end of the document.
   */
  append(content: string, options?: ContentOptions): DocumentEnd
}

interface ElementHandlerOptionals {
  /**
   * An incoming element, such as `div`
   */
  element?(element: Element): void | Promise<void>
  /**
   * An incoming comment
   */
  comments?(comment: Comment): void | Promise<void>
  /**
   * An incoming piece of text
   */
  text?(text: Text): void | Promise<void>
}

interface DocumentHandler {
  /**
   * An incoming doctype, such as <!DOCTYPE html>
   */
  doctype(doctype: Doctype): void | Promise<void>
  /**
   * An incoming comment
   */
  comments(comment: Comment): void | Promise<void>
  /**
   * An incoming piece of text
   */
  text(text: Text): void | Promise<void>
  /**
   * The ending of the document
   */
  end(end: DocumentEnd): void | Promise<void>
}

declare class HTMLRewriter {
  constructor()
  public on(selector: string, handlers: ElementHandler): HTMLRewriter
  public onDocument(handlers: DocumentHandler): HTMLRewriter
  public transform(response: Response): Response
}

// See https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

type ElementHandler = RequireAtLeastOne<ElementHandlerOptionals, 'element' | 'comments' | 'text'>
