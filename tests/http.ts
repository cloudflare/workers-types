const formData = new FormData();

const data: { [key: string]: string | File } = {};
for (const [key, value] of formData.entries()) {
  data[key] = value;
}

for (const [key, value] of formData) {
  data[key] = value;
}

export {};
