import { injectable, unmanaged } from "inversify";
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

@injectable()
export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(@unmanaged() baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((request: AxiosRequestConfig) => {
      return request;
    });
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = ({ data }: AxiosResponse) => {
    return data;
  };

  protected handleError = (error: any) => {
    return Promise.reject(error);
  };
}
