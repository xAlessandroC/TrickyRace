function separateNumber(number){
  if(number === 0)
    return ['0']

  var result = []
  var sNumber = number.toString()
  var len = sNumber.length
  for (var i = 0; i < len; i++) {
    result.push(sNumber.charAt(i));
  }
  
  return result
}
