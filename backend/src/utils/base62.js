function encodeBase62(num)
{
    const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let hashed_str = '';

    while(num>0)
    {
        hashed_str = s[num % 62] + hashed_str;
        num = Math.floor(num/62);
    }
    return hashed_str;
}
console.log(encodeBase62(160000917));