class Tile { 
  constructor(value = randomStartValue()) {
    this.value = value;
  }

  randomStartValue() {
    if (Math.floor(Math.random() * 10) < 8) {
      return 1;
    } else {
      return 2;
    }  
  }
}

export default Tile;