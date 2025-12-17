import { Injectable } from '@angular/core';
import { PopupLifecycle } from './popup.lifecycle';
import { PopupLoader } from './popup.types';

interface RegistryEntry<TData, TResult> {
    loader: PopupLoader<TData, TResult>;
    lifecycle?: PopupLifecycle<TData, TResult>;
}

@Injectable({ providedIn: 'root' })
export class PopupRegistry<
    TMap extends Record<string, any> = any
> {
    private registry = new Map<
        keyof TMap,
        RegistryEntry<any, any>
    >();

    register<K extends keyof TMap>(
        key: K,
        loader: PopupLoader<
            TMap[K]['data'],
            TMap[K]['result']
        >,
        lifecycle?: PopupLifecycle<
            TMap[K]['data'],
            TMap[K]['result']
        >
    ): () => void {
        if (this.registry.has(key)) {
            throw new Error(`Popup "${String(key)}" already registered`);
        }

        this.registry.set(key, { loader, lifecycle });

        return () => this.registry.delete(key);
    }

    get<K extends keyof TMap>(key: K) {
        const entry = this.registry.get(key);
        if (!entry) {
            throw new Error(`Popup "${String(key)}" not registered`);
        }
        return entry;
    }
}
