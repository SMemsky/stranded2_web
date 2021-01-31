function World(scene, obj) {
    this.scene = scene;
    this.objectTypes = obj;

    this.objects = {};

    this.update = function(deltaTime) {
        // ...
    };

    this.render = function(deltaTime) {
        // render skybox, clear depth
        // render infinite ground plane
        // render infinite water plane
        this.scene.driver.drawTerrain(this.terrain);
        this.scene.render();

        for (const id in this.objects) {
            const obj = this.objects[id];
            const type = this.objectTypes[obj.type];

            const modelMatrix = mat4.create();
            mat4.translate(modelMatrix, modelMatrix, [obj.x, 100, obj.z]);
            mat4.rotate(modelMatrix, modelMatrix, obj.yaw * 0.0174533, [0, -1, 0]);
            mat4.scale(modelMatrix, modelMatrix, [type.x, type.y, type.z]);
            this.scene.driver.drawModel(modelMatrix, type.visual);
        }
    };

    this.init = function(vars, terrain) {
        this.vars = vars;
        this.terrain = new Terrain(scene.driver, terrain.heightmap);
        scene.driver.setTerrainColormap(terrain.colormap);

        // also run some scripts afaik
        // on:preload?
    };

    this.freezeTime = function(freeze) {
        this.timeIsFrozen = freeze;
    };

    this.setTimedate = function(day, hour, minute) {
        this.day = day; this.hour = hour; this.minute = minute;
    };

    this.placeObject = function(object) {
        const type = this.objectTypes[object.type]
        if (type == undefined) {
            console.log("Adding unknown object " + object.type);
            return false;
        }

        // type.makeSureModelIsLoaded()

        this.objects[object.id] = object;
        this.scene.addEntity(object.id, object);

        return true;
    };
}
