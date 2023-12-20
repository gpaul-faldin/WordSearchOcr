export const printAndExit = (message: string, code: number) => {
    console.log(message);
    process.exit(code);
}