/// <reference path="./.sst/platform/config.d.ts" />

const bucket = new sst.aws.Bucket("MyBucket2", {
  access: "public"
});

new sst.aws.Nextjs("MyWeb2", {
  link: [bucket]
});

export default $config({
  app(input) {
    return {
      name: "aws-nextjs",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb2");
  },
});
