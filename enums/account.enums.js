export const CURRENCY_ENUM ={
    AGLD: "Adventure Gold",
    FJD: "Fiji Dollar",
    MXN: "Mexican Peso",
    SCR: "Seychellois Rupee",
    CDF: "Congolese Franc",
    BBD: "Barbadian Dollar",
    HNL: "Honduran Lempira",
    UGX: "Uganda Shilling",
    PKR: "Pakistani Rupee",
    EUR: "Euro",
    GBP: "Pound Sterling",
    CAD: "Canadian Dollar",
    USD: "US Dollar",
    ETH: "Ethereum"
}

export const isValidCurrency = (value)=>{
    const values = Object.values(CURRENCY_ENUM);
    return values.includes(value)
}