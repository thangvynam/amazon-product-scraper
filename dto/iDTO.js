class IDTO {
  constructor(id) {
    if (id == null) {
      throw new Error('UID not valid');
    }

    this.id = id;
  }
}

export default IDTO;
