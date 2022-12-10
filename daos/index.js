const getProductModule = async () => {
    const dataCore = process.env.DATACORE;
    if(dataCore == 'MEMORY'){
        const ModuleSource = await import ('./productsDao/memoryProducts.service.js');
        return ModuleSource.default;
    }else if (dataCore == 'FS'){
        const ModuleSource = await import ('./productsDao/fsProducts.service.js');
        return ModuleSource.default;
    }else if (dataCore == 'MONGO'){
        const ModuleSource = await import ('./productsDao/mongoProducts.service.js');
        return ModuleSource.default;
    }
}

const ProductService = async () => {
    const ProductClass = await getProductModule();
    const productService = new ProductClass();
    console.log(productService.getAllProducts());
}

export default ProductService;