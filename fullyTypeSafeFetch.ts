export const get = async (
    url: string,
    input: Record<string, string>
) => {
    return fetch(
        `${url}?${new URLSearchParams(input).toString()}`
    );
};

export const post = async (
    url: string,
    input: Record<string, string>
) => {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(input),
    });
};

type CreateAPIMethod = <
    TInput extends Record<string, string>,
    TOutput
>(opts: {
    url: string;
    method: "GET" | "POST";
}) => (input: TInput) => Promise<TOutput>;

const createAPIMethod: CreateAPIMethod =
    (opts) => (input) => {
        const method = opts.method === "GET" ? get : post;

        return (
            method(opts.url, input)
                // Imagine error handling here...
                .then((res) => res.json())
        );
    };

/**
 * You can reuse this function as many times as you
 * like to create all your API methods!
 */
const getUser = createAPIMethod<
    { id: string }, // The input
    { name: string } // The output
>({
    method: "GET",
    url: "/user",
});

getUser({ id: 123 }); // All type safe!

/**
 * https://www.typescriptlang.org/play?#code/KYDwDg9gTgLgBAYwgOwM7wObHgXjgQ1QE9kE4AKAKDjgFcoAbALjnSgEtkMAaauTsLRgsASsCRQAJgB42nHqxgcuAPkoBKODhVwA3nyjZ6yOADNsCABZUaNAAYASXfQYBfAPxPkwAO5wAqiIAMgDKwPhQVgAKEfgAtqjkAkLqAHQwECFK8uTqrnZ86gDclK4llKCQsIgo6HCQdXiEJGQ2dIwscly8NMnCcGISMl0KI2qa2noGRlAm5jBW5C7cU7ZwcdiWEJIsAERRAPIhACq7PbYARttELABSIQcAcqkj7KZESciCMOrnrsWlcowIhgYBwADChnwMGAAEEogBJACym22Wjg0j4xwRXyEcFAMOQklQA3E0GG2W6imUGBU52OByE30oKnIEDAMFQLH0NBcnUpGBKNA2MC2OzguwA4gBRU5wAA+EsOJ12JX+Wh0n2+LGxuJ+GrgUSgEDi7FQwGkDKZQhU5SQaHgCChMPhyNR4sh4RdiJRorROD4bI5qAmmr6odWtntdRFYvR7M5qVj-pweClst2cHccCw8BYDRg5TWhhgxgofDWyckQcTy34evUFbWcAA9C24Ai4vgMJwwcAoMaoHBLPgiQx5MP+8BUjOm2t0pZgMhyORDCGDWvUgArVAoXKNtYAmhlSiUFsAKnP1HPcAAmhBaIhR3BDLRzXBRWazLRSDB2CgCBJLtkCID92A2ElCDgIgH2vOBxwAazBDJEGdMF8AYBhoIfIdXXWd1UAAQmvFtKGjTBsH8c0hzwJ0vThH13UxGhdH4cURjgVwVjbOBjkXetmRYuBkHiYB+RpTjW3bPiwQfGBmVZHl8L9cV01Oc4+QlFs337M5SgBShcyo-tyFY9hxQARgAJgAZk44opLgWFMI-EEwVQfBzGIoA
 */