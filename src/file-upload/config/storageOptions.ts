import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

export const dest = () => {
  const time = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
  const dest = `uploads/${time}/`;
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  return dest;
};

export const fname = (oname: string) => {
  const date = new Date();
  const uniqueSuffix = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;
  const ext = extname(oname);
  const name = oname.replace(ext, '');
  const filename = `${name}_${uniqueSuffix}${ext}`;
  return filename;
};
