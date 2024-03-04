/* eslint-disable prettier/prettier */

type AnyFunction = (...args: any[]) => any;


function debounce<F extends AnyFunction>(func: F, delay: number): (...args: Parameters<F>) => void {
    let timerId: NodeJS.Timeout;

    return function (this: any, ...args: Parameters<F>) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


function throttle<F extends AnyFunction>(func: F, limit: number): (...args: Parameters<F>) => void {
    let inThrottle = false;

    return function (this: any, ...args: Parameters<F>) {
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

export { debounce, throttle }