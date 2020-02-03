export default (proc, list) => list
  .reduce((acc, item) => acc.concat(proc(item)), []);
