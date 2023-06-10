declare global {
  namespace Express {
    interface User {
      username: string;
    }
  }
}

// Why export an empty object?
//  Due to the way TypeScript handles files, a file with only a declare global block in it would be considered an augmentation for
//  the global scope. That's not what we want. To make it a module augmentation, we have to export something from the file. It can be anything,
//  like an empty object or a dummy function. It's not used anywhere, so it doesn't matter what it is.
export {};
