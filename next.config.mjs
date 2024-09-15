import path from 'path';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'styles')],
    prependData: `@import "./src/styles/_vars.scss"; @import "./src/styles/_mixins.scss"; @import "./src/styles/_style.scss";`,
  },
};

export default withNextIntl(nextConfig);
