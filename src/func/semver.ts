export function semverSort(releaseVersion: string[]) {
  return releaseVersion.sort((rel1, rel2) => {
    const rel1arr = rel1.split('.').map((elem) => {
      return Number(elem);
    });
    const rel2arr = rel2.split('.').map((elem) => {
      return Number(elem);
    });
    for (let i = 0; i < Math.max(rel1arr.length, rel2arr.length); i++) {
      const diff =
        (isNaN(rel1arr[i]) ? 0 : rel1arr[i]) -
        (isNaN(rel2arr[i]) ? 0 : rel2arr[i]);

      if (diff != 0) {
        return diff;
      }
    }
    return 0;
  });
}
