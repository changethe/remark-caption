# remark-figcaptions

remark plugin to wrap certain elements in a `<figure>` tag and give them a `<figcaption>`.

currently works for blockquotes and tables.

## syntax:

just add a caption marker on the next line after the blockquote or table followed by the caption
text.

markers: `caption:`, `table:`, `quote:`, `cite:`

markers are case-insensitive.

```markdown
> blockqupte

caption: this will be the caption
```

if no caption is detected, it will still wrap it in a figure, but not add a `<figcaption>` tag.

will also give the wrapping figcaption a class for easy styling with css. `blockquote-figure` is the
class for blockquotes and `table-figure` for tables.

## todo

- typescript
- add tests
- add more elements to wrap: images, code blocks, etc.
- make markers and classes configurable
- write an actual readme
