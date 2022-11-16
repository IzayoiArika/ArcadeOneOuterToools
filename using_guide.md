# Using Guide
展示一下参数避免不会用。This guide is written for using these tools easier.

## arc_cutter_zigzags.js
使用方法：Correct steps to use:
在谱面中准备好两条蛇，其中一条是绿色。黑线也一样。 Prepare 2 arcs in your Arcade, one of which should be green. The same when dealing traces.
选择类型，输入切割段数，执行。 Choose a type below, input a number which indicates the sum of broken arcs， and execute the outer tool.

生成逻辑： Way of generating:
生成的折线蛇总是从蓝色/红色蛇上出发，到达绿色蛇上后返回。 Broken arcs generated are always start their routine from the blue/red arc, get to the green arc, and go back.

类型可选： Types below are available:
1. normal
简单的折现蛇。 Simple zigzag arcs.
2. parallel
（接近）平行的一组蛇。例子参考官谱7thSense Future。 Parallel(ish) arcs eg. 7thSense Future.
3. rect
不好描述，反正魔王Beyond那种。 Um, hard to describe so I just give an example. Eg. World Ender Beyond.
