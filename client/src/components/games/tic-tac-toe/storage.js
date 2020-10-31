
class Storage {

    constructor(storageName = 'gameScoreboard',initialValue = [])
    {
      this.storageName = storageName
      localStorage.getItem(storageName) || localStorage.setItem(storageName,initialValue)
    }

    getData = ()=>JSON.parse(localStorage.getItem(this.storageName))

    update = (data)=>{
      localStorage.setItem(this.storageName,JSON.stringify(data))
    }
  }

  export default Storage