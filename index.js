
var constants = {
  TYPE_MISMATCH: {
      matching_types: false,
      similarity: 0,
      deep_equal: false
  }
};

function compare_literals(lhs,rhs) {
  if(lhs === rhs) {
    return {
      matching_types: true,
      similarity: 1,
      deep_equal: true
    };
  }else{
    return {
      matching_types: true,
      similarity: 0,
      deep_equal: false 
    };
  }
};

function compare_arrays(lhs, rhs) {
  var length = Math.max(lhs.length, rhs.length);
  var matching = 0;
  var total_properties = length;
  var deep_equal = false;
  for(var i = 0; i < length; i++) {
    if(i in lhs && i in rhs) {
      var member_comparison = fuzzyEqual(lhs[i],rhs[i]);
      if(member_comparison.matching_types && member_comparison.deep_equal) {
        matching++;
      }
    }
  }
  var similarity = 0;
  if(lhs.length === rhs.length && length === 0){
    similarity = 1;
    deep_equal = true;
  } else {
    similarity = matching/length;
    if(length === matching) {
      deep_equal = true;
    }
  }
  return {
    matching_types: true,
    property_count: length,
    matching: matching,
    similarity: similarity,
    deep_equal: deep_equal
  };
};

function compare_objects(lhs,rhs) {
  var total_properties = 0;
  var matching = 0;
  var similarity = 0;
  var matching_props = {};
  var leftside_props = [];
  var rightside_props = [];
  var differing_props = [];
  var deep_differences = {};
  var deep_equal = false;
  for(var prop in lhs) {
      total_properties++;
      if(prop in rhs) {
        matching_props[prop] = true;
        var comparison = fuzzyEqual(lhs[prop],rhs[prop]);
        if(comparison.matching_types && comparison.deep_equal) {
          matching++;
        }else{
          differing_props.push[prop];
          deep_differences[prop] = comparison;
        }
      }else{
        leftside_props.push(prop);
        differing_props.push[prop];
      }
  }

  for(var rprop in rhs) {
    if(rprop in matching_props) {
      continue;
    }else{
      total_properties++;
      rightside_props.push(rprop);
      differing_props.push[rprop];
    }
  }

  if(total_properties === 0) {
    similarity = 1;
    deep_equal = true;
  } else {
    similarity = matching/total_properties;
    if(total_properties === matching) {
      deep_equal = true;
    }
  }

  return {
    matching_types: true,
    property_count: total_properties,
    matching: matching,
    similarity: similarity,
    deep_equal: deep_equal,
    differing_properties: differing_props,
    common_properties: matching_props,
    deep_differences: deep_differences,
    left_only: leftside_props,
    right_only: rightside_props
  }
};


function fuzzyEqual(lhs, rhs) {
  var left_hand_type = typeof lhs;
  var right_hand_type = typeof rhs;
  var not_objects = (left_hand_type != "object") && (right_hand_type != "object");
  if(left_hand_type === right_hand_type && not_objects) {
    // they're similar type
    // if they're literals
    return compare_literals(lhs,rhs);
  }else if(left_hand_type === right_hand_type) {
    // if they're object or arrays
    var left_hand_array = Array.isArray(lhs);
    var right_hand_array = Array.isArray(rhs);
    var left_hand_null = lhs === null;
    var right_hand_null = rhs === null;
    if(left_hand_null && right_hand_null) {
      return compare_literals(lhs,rhs);
    }else if(left_hand_array === right_hand_array && !(left_hand_null || right_hand_null)) {
      if(left_hand_array) {
        return compare_arrays(lhs, rhs); 
      }else{
        return compare_objects(lhs, rhs); 
      }
    }
  }
  return constants.TYPE_MISMATCH; 
}

module.exports = fuzzyEqual;
