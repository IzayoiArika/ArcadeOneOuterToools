
function OnLoad()
{
	return {
		"providers": ["grid_aligning"],
		"info": {
			"grid_aligning": {
				"name": "坐标对齐工具",
				"params": ["X网格设置","Y网格设置","对齐时误差"],
				"params_value": {
					"X网格设置": "-0.5>1.5/0.25;-.38;-.12;.12;.38;.62;.88;1.12;1.38",
					"Y网格设置": "",
					"对齐时误差": "0.01"
				}
			}
		}
	}
}

function parseGridRange(range) {
    var tmp = range.split(">");
    var lowerBound = parseFloat(tmp[0]);
    tmp = tmp[1].split("/");
    var upperBound = parseFloat(tmp[0]);
    var step = parseFloat(tmp[1]);
    
    var list = [];
    for (var current = lowerBound; current < upperBound + 0.005; current = current + step) {
        list.push(current);
    }
    return list;
}

function parseGrid(grid) {
    var raw = grid.split(";");
    var final = [];
    for (var i = 0; i < raw.length; i++) {
        if (raw[i].indexOf(">") != -1) {
            final += parseGridRange(raw[i]);
        }
        else final += parseFloat(raw[i]);
    }
    return final;
}

function alignToGrid(grid, pos, alignDelta) {
    for (var i = 0; i < grid.length; i++) {
        if (Math.abs(pos - grid[i]) <= alignDelta + 0.001) return grid[i];
    }
    return pos;
}

function grid_aligning(xGridRaw, yGridRaw, alignDelta) {
    var xGrid = parseGrid(xGridRaw);
    var yGrid = parseGrid(yGridRaw);
	var notes = GetSelectedNotes();
	if (notes.length < 1) return "请选择要对齐的物件。";
	
	var delta = parseFloat(alignDelta);
	var note;
	for (var i = 0; i < notes.length; i++) {
	    note = notes[i];
	    if (!(note instanceof ArcArc)) continue;
		var arc = new ArcArc();
		arc.LineType = note.LineType;
		arc.Timing = note.Timing;
		arc.EndTiming = note.EndTiming;
		arc.Color = note.Color;
		arc.XStart = alignToGrid(xGrid, note.XStart, delta);
	    arc.XEnd = alignToGrid(xGrid, note.XEnd, delta);
		arc.YStart = alignToGrid(yGrid, note.YStart, delta);
		arc.YEnd = alignToGrid(yGrid, note.YEnd, delta);
		arc.IsVoid = note.IsVoid;
		arc.TimingGroup = note.TimingGroup;
		AddArcEvent(arc);
		for (var ai = 0; ai < note.ArcTaps.count; ai++) {
		    AddArcTap(arc, note.ArcTaps[ai]);
		}
		RemoveArcEvent(note);
	}
}
