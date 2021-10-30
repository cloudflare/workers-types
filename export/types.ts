// Types defined in autodecl/types.py

export interface Type {
  name?: string;
  args?: Type[];
  index?: Type;
  params?: Field[];
  members?: Field[];
  returns?: Type;
  optional?: boolean;
  variadic?: boolean;
}

export interface TypeParam {
  name: string;
  constraint?: Type;
  default?: Type;
}

export interface CommentParam {
  name: string;
  text: string;
}

export interface Comment {
  text: string;
  deprecated?: string;
  params?: CommentParam[];
  returns?: string;
  examples?: { [language: string]: string[] };
}

export interface Field {
  name: string;
  type: Type;
  static?: boolean;
  readonly?: boolean;
  typeparams?: TypeParam[];
  comment?: Comment;
}

export interface Declaration<Kind extends string> {
  name: string;
  typeparams?: TypeParam[];
  comment?: Comment;
  kind: Kind;
}

export interface Class extends Declaration<"class"> {
  members: Field[];
  extends?: Type[];
  implements?: Type[];
}

export interface Struct extends Declaration<"struct"> {
  members: Field[];
  extends?: Type[];
}

export interface TypeDef extends Declaration<"typedef"> {
  type: Type;
}

export interface Function extends Declaration<"function"> {
  type: Type;
}

export interface Variable extends Declaration<"variable"> {
  type: Type;
}
