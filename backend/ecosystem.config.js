module.exports = {
  apps : [{
    script    : "src/index.ts",
    instances : "max",
    exec_mode : "cluster"
  }]
}
