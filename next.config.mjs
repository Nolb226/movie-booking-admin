/** @type {import('next').NextConfig} */
import './env.mjs'

const nextConfig = {
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: { ignoreBuildErrors: true },
}

export default nextConfig
