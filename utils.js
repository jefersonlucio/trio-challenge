const isUnderMocha = () => {

    return !!(process.argv.find(el =>
        el.indexOf("mocha.js") >= 0));
};

export { isUnderMocha }
