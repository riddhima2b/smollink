function encodeBase62(num)
{
    const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let hashed_str = '';

    if (num < 0) throw new Error('encodeBase62: input must be non-negative');

    if(num == 0) return s[0];

    while(num>0)
    {
        hashed_str = s[num % 62] + hashed_str;
        num = Math.floor(num/62);
    }
    return hashed_str;
}
module.exports = {encodeBase62};
