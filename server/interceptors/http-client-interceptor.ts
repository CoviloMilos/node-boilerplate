import { injectable, unmanaged } from "inversify";
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { ResponseError } from "../models";

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

  private initializeRequestInterceptor = (): void => {
    this.instance.interceptors.request.use((request: AxiosRequestConfig) => {
      return request;
    });
  };

  private initializeResponseInterceptor = (): void => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = ({ data }: AxiosResponse): any => {
    return data;
  };

  protected handleError = (error: ResponseError): any => {
    return Promise.reject(error);
  };
}
