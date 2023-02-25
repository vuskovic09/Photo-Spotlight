window.onload = function(){
    const strip = document.getElementById("strip");
    const scrollContainer = document.getElementById('main');

    window.onmousedown = e =>  {
       strip.dataset.mousedownAt = e.clientX;
    }

    window.onmouseup = e => {
        strip.dataset.mousedownAt = "0";
        strip.dataset.prevPercentage = strip.dataset.percentage;
    }

    window.onmousemove = e => {
        if(strip.dataset.mousedownAt === "0") return;

        const mouseDelta = parseFloat(strip.dataset.mousedownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(strip.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        strip.dataset.percentage = nextPercentage;

        strip.animate({
            transform: `translate(${nextPercentage}%, 50%)`
          }, { duration: 1200, fill: "forwards" });

        for(const image of strip.getElementsByClassName("image")) {
            image.animate({
              objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
          }
    }
};