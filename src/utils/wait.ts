/**
 * Wait a certain amount of seconds to continue
 * @param {Number} value
 * @example
 * await sec(1)
 */

export async function WaitSec(value: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, value * 1000));
}
