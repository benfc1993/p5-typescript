export const useEvent = () => {
    const subscribers = new Set();
    const subscribe = (callback) => {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
    };
    const raise = (data) => {
        subscribers.forEach((subscriber) => subscriber(data));
    };
    return {
        raise,
        subscribe,
    };
};
//# sourceMappingURL=Events.js.map