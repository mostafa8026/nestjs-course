interface ConfigurationInterface {
  mail: {
    password: string;
  };
}

export const configuration: ConfigurationInterface = {
  mail: {
    password: process.env.MAIL_PASSWORD as string,
  },
};
