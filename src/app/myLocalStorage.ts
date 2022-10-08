import { Component, OnInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyLocalStorage {
  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string, expiry: number) {
    // if the expiry time is 0, it means there is no need to add the item
    if (expiry === 0) return;
    localStorage.setItem(key, value);
    // let timer:Number;
    if (expiry) {
      let timer = setTimeout(() => {
        this.removeItem(key);
        timer && clearTimeout(timer);
      }, expiry);
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  reApplyExpiryTimeout(expiry: number) {
    if (expiry) {
      let timer = setTimeout(() => {
        this.clear();
        window.location.href = '/';
        timer && clearTimeout(timer);
      }, expiry);
    }
  }
}
