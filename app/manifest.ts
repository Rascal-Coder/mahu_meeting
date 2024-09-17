import {MetadataRoute} from "next"
export default function manifest():MetadataRoute.Manifest {
    return {
      name: 'Mahu-meeting App',
      short_name: 'Mahu-meeting App',
      description: 'Efficient meeting management application',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#000',
      icons: [
        {
          src: '/logo/logo.png',
          sizes: '64x64',
          type: 'image/png',
        },
      ],
    }
  }