# remark-caption

remark plugin to add syntax for captioning blockquotes and tables.

blockquotes and tables are wrapped in a `<figure>` tag by default and given a `<figcaption>` with
the caption, if one is provided.

for blockquotes: if the caption contains a link, it will also be added to the `cite` attribute in
the `<blockquote>` tag.

## syntax:

just add a caption marker on the next line after a blockquote or table, followed by the caption
text.

default markers: `caption:`, `table:`, `quote:`, `cite:`

markers are case-insensitive.

### examples:

simple blockquote example:

```markdown
> blockquote text

caption: this will be the caption

rest of the markdown content
```

multiline captions are also supported (useful if there are long links in the caption):

```markdown
> blockquote text

caption: A caption with
[a very long link](https://example.com/veryverylonglink/to/a/source/that/you/want/to/cite)

rest of the markdown content
```

## styling

the wrapping figcaption will get a class attribute for easy styling with css. `blockquote-figure` is
the class for blockquotes and `table-figure` for tables.

## configuration:

| Name       | Type   | default                                                   | Description                                                          |
| ---------- | ------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| markers    | array  | ['caption:', 'table:', 'quote:', 'cite:']                 | the markers you want to use                                          |
| classNames | object | { table: 'table-figure', blockquote: 'blockquote-figure'} | the classnames you want to apply to the corresponding figure element |

for example:

```js
  markers: ['custommarker1:', 'marker2:', 'anothermarker:'],
  classNames: {
    table: 'custom-table-figure-class',
    blockquote: 'custom-blockquote-figure-class',
  }
```

## todo

- typescript
- add tests
- add more elements to wrap: images, code blocks, etc.
- write an actual readme
