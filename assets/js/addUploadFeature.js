const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'UPDATE' && resource === 'articles') {
        // notice that following condition can be true only when `<ImageInput source="img" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.img is not an array, but single object
        if (params.data.img && params.data.img.length) {
            {console.log(params.data.img)}
            // only freshly dropped img are instance of File
            const formerimg = params.data.img.filter(p => !(p.rawFile instanceof File));
            const newimg = params.data.img.filter(p => p.rawFile instanceof File);

            return Promise.all(newimg.map(convertFileToBase64))
                .then(base64img => base64img.map((img64, index) => ({
                    src: img64,
                    title: `${newimg[index].title}`,
                })))
                .then(transformedNewimg => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        img: [...transformedNewimg, ...formerimg],
                    },
                }));
        }
    } else if (type === 'CREATE' && resource === 'articles') {
        // notice that following condition can be true only when `<ImageInput source="img" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.img is not an array, but single object
        if (params.data.img && params.data.img.length) {
            {console.log(resource)}
            // only freshly dropped img are instance of File
            const formerimg = params.data.img.filter(p => !(p.rawFile instanceof File));
            const newimg = params.data.img.filter(p => p.rawFile instanceof File);

            return Promise.all(newimg.map(convertFileToBase64))
                .then(base64img => base64img.map((img64, index) => ({
                    src: img64,
                    title: `${newimg[index].title}`,
                })))
                .then(transformedNewimg => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        img: [...transformedNewimg, ...formerimg],
                    },
                }));
        }
    }
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;