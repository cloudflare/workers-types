const formData = new FormData();

const data: { [key: string]: string | File } = {};
for (const [key, value] of formData.entries()) {
  // data[key] = value; // TODO: this should be uncommented
}

for (const [key, value] of formData) {
  // data[key] = value; // TODO: this should be uncommented
}

export {};
