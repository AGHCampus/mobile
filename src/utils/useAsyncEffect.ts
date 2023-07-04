import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

export default function useAsyncEffect(
    effect: () => Promise<void>,
    deps: DependencyList,
    cleanup?: () => Promise<void>,
) {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        let ignore = false;
        let mountSucceeded = false;

        const runEffect = async () => {
            if (!isMounted.current || ignore) {
                return;
            }
            await effect();
            mountSucceeded = true;
            if (!isMounted.current || ignore) {
                await cleanup?.();
            }
        };

        runEffect();

        const unmount = async () => {
            await cleanup?.();
        };

        return () => {
            ignore = true;
            if (mountSucceeded) {
                unmount();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
