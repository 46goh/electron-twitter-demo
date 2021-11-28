declare module 'twitter-v2' {
  export default class Twitter {
    constructor(
      loginInfo:
        | {
            consumer_key: string
            consumer_secret: string
          }
        | {
            consumer_key: string
            consumer_secret: string
            access_token_key: string
            access_token_secret: string
          }
        | {
            bearer_token: string
          }
    )
    get: (path: string, urlParams: Record<string, string>) => Promise<Record<string, any>>
  }
}
