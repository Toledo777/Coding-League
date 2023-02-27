const decoder = new TextDecoder();
export async function readTextFileWithLimit(path: string, limit: number): Promise<string> {
    const file = await Deno.open(path);
    const buffer = new Uint8Array(limit);
    const length = await file.read(buffer);
    file.close();
    return decoder.decode(buffer.subarray(0, length!));
}