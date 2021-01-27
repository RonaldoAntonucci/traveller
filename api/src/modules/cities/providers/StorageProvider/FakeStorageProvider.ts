import IStorageProvider from './IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      (storagedFile) => storagedFile === file,
    );

    if (findIndex >= 0) {
      this.storage.splice(findIndex, 1);
    }
  }
}
