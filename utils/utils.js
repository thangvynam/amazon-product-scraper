class Utils {
  static removeImageSuffix(imageUrl) {
    const regex = /_.*\.webp/;
    const match = imageUrl.match(regex);
    if (match) {
      return imageUrl.replace(regex, '');
    }
    return imageUrl;
  }
}

export default Utils;
