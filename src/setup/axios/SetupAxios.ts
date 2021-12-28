export default function setupAxios(axios: any, store: any) {

  // const instance = axios.create({
  //   baseURL: "http://103.58.166.106:8004/api",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   timeout: 60000,
  // });
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {accessToken},
      } = store.getState()
      config.baseURL = 'http://103.58.166.106:8004/api';
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}
