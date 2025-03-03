/// <reference types="@dcloudio/types" />

declare namespace UniApp {
  interface ShowToastOptions {
    title: string;
    icon?: 'success' | 'loading' | 'none' | 'error';
    image?: string;
    duration?: number;
    mask?: boolean;
    position?: 'top' | 'center' | 'bottom';
    success?: () => void;
    fail?: (err: any) => void;
    complete?: () => void;
  }

  interface Uni {
    showToast(options: ShowToastOptions): void;
  }
}

declare const uni: UniApp.Uni;

declare module '@qiun/ucharts' {
  const content: any;
  export default content;
}

declare module '@qiun/ucharts/components/qiun-data-charts/qiun-data-charts.vue' {
  const content: any;
  export default content;
} 