export default function urlToId(url) {
    const parts = url.split("/");
    let [b, a] = [parts.pop(), parts.pop()];
    return `${a}${b}`;
}