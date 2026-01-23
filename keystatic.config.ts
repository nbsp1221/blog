import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "src/data/blog/*",
      entryLayout: "content",
      format: { contentField: "content" },
      columns: ["title", "pubDatetime", "draft"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        pubDatetime: fields.date({ label: "Publish date" }),
        modDatetime: fields.date({
          label: "Modified date",
          validation: { isRequired: false },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: props => props.value ?? "tag",
        }),
        ogImage: fields.image({
          label: "OG image",
          directory: "src/assets/images/blog",
          publicPath: "@/assets/images/blog/",
          validation: { isRequired: false },
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        featured: fields.checkbox({
          label: "Featured",
          defaultValue: false,
        }),
        canonicalURL: fields.text({
          label: "Canonical URL",
          validation: { isRequired: false },
        }),
        hideEditPost: fields.checkbox({
          label: "Hide edit link",
          defaultValue: false,
        }),
        timezone: fields.text({
          label: "Timezone",
          validation: { isRequired: false },
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "src/assets/images/blog",
              publicPath: "@/assets/images/blog/",
            },
          },
        }),
      },
    }),
  },
});
