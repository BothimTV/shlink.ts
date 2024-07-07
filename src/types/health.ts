export interface healthJson {
    status: 'pass' | 'fail' | 0,
    version?: string,
    links?: {
        about: 'https://shlink.io',
        project: 'https://github.com/shlinkio/shlink'
    }
    type?: string
    title?: string,
    detail?: string
}